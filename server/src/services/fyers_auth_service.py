import os
from fyers_apiv3 import fyersModel
from src.common.constants.env_variable import (
    REDIRECT_URL,
)
from urllib.parse import parse_qs, urlparse
import requests
import pyotp
import base64


class FyersAuthService:
    def __init__(
        self,
        APP_ID,
        SECRETE_KEY,
        FY_ID,
        TOTP_KEY,
        PIN,
    ):
        self.client_id = APP_ID
        self.secret_key = SECRETE_KEY
        self.fy_id = FY_ID
        self.totp_key = TOTP_KEY
        self.pin = PIN
        self.redirect_url = REDIRECT_URL
        self.status = {"status": "initializing"}
        self._initialize_fyers_models()

    def _initialize_fyers_models(self):
        # Generate and verify OTP
        url_send_login_otp = "https://api-t2.fyers.in/vagator/v2/send_login_otp_v2"
        res = requests.post(
            url=url_send_login_otp,
            json={"fy_id": self._get_encoded_string(self.fy_id), "app_id": "2"},
        ).json()
        url_verify_otp = "https://api-t2.fyers.in/vagator/v2/verify_otp"
        res2 = requests.post(
            url=url_verify_otp,
            json={
                "request_key": res["request_key"],
                "otp": pyotp.TOTP(self.totp_key).now(),
            },
        ).json()

        # Verify PIN
        ses = requests.Session()
        url_verify_otp2 = "https://api-t2.fyers.in/vagator/v2/verify_pin_v2"
        payload2 = {
            "request_key": res2["request_key"],
            "identity_type": "pin",
            "identifier": self._get_encoded_string(self.pin),
        }
        res3 = ses.post(url=url_verify_otp2, json=payload2).json()

        # Generate token
        ses.headers.update({"authorization": f"Bearer {res3['data']['access_token']}"})
        token_url = "https://api-t1.fyers.in/api/v3/token"
        payload3 = {
            "fyers_id": self.fy_id,
            "app_id": self.client_id[:-4],
            "redirect_uri": self.redirect_url,
            "appType": "100",
            "code_challenge": "",
            "state": "None",
            "scope": "",
            "nonce": "",
            "response_type": "code",
            "create_cookie": True,
        }
        res3 = ses.post(url=token_url, json=payload3).json()
        auth_code = parse_qs(urlparse(res3["Url"]).query)["auth_code"][0]

        # Set the authorization code in the session object
        session = fyersModel.SessionModel(
            client_id=self.client_id,
            secret_key=self.secret_key,
            redirect_uri=self.redirect_url,
            response_type="code",
            grant_type="authorization_code",
        )
        session.set_token(auth_code)

        # Generate the access token using the authorization code
        response = session.generate_token()

        # Initialize the FyersModel instance with your client_id, access_token, and enable async mode
        self.fyers = fyersModel.FyersModel(
            client_id=self.client_id,
            is_async=False,
            token=response["access_token"],
            log_path=os.getcwd(),
        )

        if response["code"] == 200:
            self.status = {"status": "success", "message": "Fyers verification successful"}
            return self.status
        else:
            self.status =  {"status": "error", "message": response["message"]}
            return self.status
        
    def _get_encoded_string(self, string):
        string = str(string)
        base64_bytes = base64.b64encode(string.encode("ascii"))
        return base64_bytes.decode("ascii")

    def get_fyers_profile(self):
        try:
            profile = self.fyers.get_profile()
            return profile
        except Exception as e:
            return {"error": str(e)}
