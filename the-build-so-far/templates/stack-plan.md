# Full-stack plan: [project]

- **Date:**
- **Owner:**
- **Critical user journey:**

## Scale assumptions

| Assumption | Launch | Expected peak | Revisit when |
|---|---:|---:|---|
| Daily active users | | | |
| Concurrent users | | | |
| Requests per minute | | | |
| Rows added per month | | | |
| Stored files / largest file | | | |
| Longest background job | | | |

## 01. Surfaces

- **Public web:**
- **Admin / internal:**
- **Mobile / native:**
- **Public API or integrations:**
- **Shared business rules and their owner:**

## 02. State

- **Primary database:**
- **Core entities:**
- **File storage:**
- **Cache and invalidation rule:**
- **Search or analytics store:**
- **Retention / export / deletion:**

## 03. Trusted server logic

- **Request handlers / edge functions:**
- **Database functions / transactions:**
- **Scheduled jobs:**
- **Queues / workers:**
- **Realtime:**
- **Timeout, retry, and idempotency rules:**

## 04. Delivery

- **Domain and registrar:**
- **DNS / CDN / TLS:**
- **Frontend host:**
- **Server or function host:**
- **App-store distribution:**
- **Regions / latency requirement:**

## 05. Rented capabilities

| Capability | Provider | Secret location | Sandbox / staging | Failure behavior | Quota / cost trigger |
|---|---|---|---|---|---|
| Authentication | | | | | |
| Payments | | | | | |
| Email / push / SMS | | | | | |
| Maps / media / AI / feeds | | | | | |

## 06. Operations

- **Uptime check:**
- **Synthetic critical journey:**
- **Error tracking:**
- **Logs and metrics:**
- **Alerts and owner:**
- **Product success events:**
- **Backup coverage:**
- **Restore test / RPO / RTO:**

## 07. Delivery workflow

- **Repository and review:**
- **CI checks:**
- **Local / preview / staging / production:**
- **Migration process:**
- **Secrets and configuration:**
- **Feature flags:**
- **Release and rollback:**

## Cross-cutting checks

- **Security:** trust boundaries, least privilege, rate limits, dependency scanning
- **Privacy:** collection, consent, retention, export, deletion
- **Accessibility:** keyboard, labels, contrast, zoom, reduced motion
- **Cost:** budgets, usage alerts, per-event services, likely scale cliff

## Gaps accepted for launch

| Gap | Why acceptable now | Owner | Deadline / trigger |
|---|---|---|---|
| | | | |
