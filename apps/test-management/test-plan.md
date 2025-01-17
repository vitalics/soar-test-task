# Test plan

## 1. Introduction

into

## 2. Objectivies & tasks

### Objectives

- Validate the critical functionalities
- Resolve bugs early in the development cycle.

### Tasks

- Design and execute test cases for all user stories.
- Conduct all kind of tests.
- Automate regression tests for repeated validation.

## 3. Scope

User stories to cover:

- Registered user login and logout functionalities.
- Account upgrades for individual investors.
- Approval notifications via SMS.
- Loan approval workflows across departments.
- Integration with a third-party corporate registration verification service.

## 4. Testing Strategy

### System and Integration Testing

Validate interactions between modules.

### Performance and Stress Testing

Test system behavior under loads.

### User Acceptance Testing

Conduct end-to-end tests with users to confirm the system meets expectations.

### Automated Regression Testing

Use automated scripts to ensure no existing functionality is broken during updates.

## 5. Hardware requirements

- Servers with high availability to support load testing.
- Devices (desktop, mobile) for usability testing.

## 6 Test Schedule

some example schedule

Week 1: Test case design
Week 2: Alpha testing
Week 3: System and integration testing
Week 4: Performance testing

## 7 Control Procedures

Weekly progress reviews.
Daily standups to track blockers and risks.

## 8 Features to Be Tested

- Premium account upgrade process.
- SMS notifications for approvals and rejections.
- Departmental approval workflows.

## 9 Features Not to Be Tested

- Features not explicitly mentioned in the user stories.
- Non-critical UI aesthetics.

## 10 Resources/Roles & Responsibilities

Test Manager: Define strategies, manage schedules.
Test Engineers: Execute test cases, report defects.
Developers: Fix identified issues.
Business Analysts: Validate user requirements.

## 11 Schedules

Testing phases align with the development sprint timeline.
Regular reviews to update priorities.

## 12 Dependencies

Availability of APIs for third-party integrations.
Timely updates from the development team.
Access to testing environments.

## 13 Risks/Assumptions

Risks: Delays in third-party service integration, insufficient test data.
Assumptions: All modules will be delivered as per schedule.

## 14 Tools

Test Management: Allure TestOps
E2E Automation: Playwright
Mobile Automation: Appium
Performance Testing: K6
Defect Tracking: JIRA

## 15 Approvals

Approval will be sought from:

- Product Owner
- Test Manager
- Development Lead
