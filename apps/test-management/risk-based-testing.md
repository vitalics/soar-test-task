# Risk-Based Testing (RBT)

## Registered User Login From a New Device

Risk: High

- Unauthorized access via weak validation.
- OTP delivery issues.
- Logout from other devices fails.

### Mitigation

- Test edge cases for OTP validation.
- Test concurrent logins from multiple devices.

## Individual Investor - Upgrade to Premium

Risk: High

- Incorrect validation of user eligibility.
- Document upload failures.
- Delayed notification handling.

### Mitigation

- Test all validation rules for eligibility.
- Perform stress testing for bulk document uploads.
- Validate notifications end-to-end.

other TDB
