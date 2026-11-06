# Política de Seguridad Zero-Trust, Soberanía de Datos y Confidencialidad B2B

> **Vega y Sánchez Consultores SAC (RUC 20536779320)**  
> *Área de Arquitectura de Software y Seguridad de la Información — SGAF-V&S v4.1*

---

## 1. Compromiso de Confidencialidad Patrimonial (Ley N° 29733, Ley N° 29783 & NDA Corporativos)

En **Vega y Sánchez Consultores SAC**, la reserva tributaria, contable, patrimonial y de propiedad intelectual en proyectos industriales, mineros, bancarios y estatales opera bajo arquitectura **Zero-Trust**.

### Pilares Criptográficos y Operativos v4.1:
1. **Segregación Dual-Repo (Cero Exposición de Propiedad Intelectual):** Los motores algorítmicos y tributarios en Python residen exclusivamente en infraestructura privada controlada; el portal comercial público se despliega desde una rama huérfana auditada automáticamente con cero archivos de código backend.
2. **Terminal de Campo Bloqueada con Doble Llave (`AES-256-GCM` + `RSA-OAEP-2048` Escrow):** El colector móvil `campo.html` v4.1 permanece bloqueado para terceros y exige credencial firmada `HMAC-SHA256` con expiración automática, firma digital de confidencialidad NDA (**Ley N° 29733**) + SST/EPP (**Ley N° 29783**), conteo ciego (*Blind Count*) y cifrado autenticado en `IndexedDB` y contenedores `.vyspack`.
3. **Cadena Criptográfica Anti-Fraude (`SHA-256 Hash-Chaining` + Geocerca GPS):** Cada captura en campo enlaza el resumen criptográfico del registro previo, valida evidencia fotográfica en vivo (`WebRTC`), distancia geodésica Haversine a planta y numeración de marbetes asignada por brigadista.
4. **Bóveda Anti-Ransomware (`.vysvault`) y Anonimización (`HMAC-SHA256`):** Los expedientes locales se custodian cifrados con `AES-256-GCM` + `PBKDF2-HMAC-SHA256` (300,000 iteraciones) y validación estricta anti-*Path-Traversal*.

---

## 2. Versiones Soportadas

| Componente | Versión | Estado de Soporte |
| :--- | :--- | :--- |
| **SGAF-V&S Core & Field Hub Zero-Trust** | `v4.1.x` | :white_check_mark: Soporte Activo |
| **App Móvil Zero-Trust (`campo.html` v4.1)** | `v4.1.x` | :white_check_mark: Soporte Activo |
| **Portal Comercial B2B & Demo Sandbox (`dashboard.html`)** | `v4.1.x` | :white_check_mark: Soporte Activo |
| **Versiones Anteriores (`<= v3.1`)** | `<= v3.1` | :warning: Actualizado a `v4.1` |

---

## 3. Reporte Responsable de Vulnerabilidades

* **Canal Oficial:** [gvega@vegaysanchez.com](mailto:gvega@vegaysanchez.com) con asunto `[SEGURIDAD SGAF] - Reporte Técnico`.
* **SLA de Respuesta:** Confirmación en un máximo de **24 a 48 horas hábiles**.
