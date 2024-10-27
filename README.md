# Budget Tracker Application

## Overview
The **Budget Tracker** is a full-stack web application designed to help users manage their personal finances. It allows users to sign up, log in, and securely manage their budgets, expenses, and transactions. The application provides an intuitive interface for viewing and organizing financial information, making it easy to track spending habits and budget more effectively.

The application is built using **Angular** for the frontend and a **Node.js/Express** or **Spring Boot** backend. It integrates with **MongoDB** for data storage and is deployed in a **Kubernetes** cluster using **Docker** containers. The app is designed to be scalable and reliable, leveraging Kubernetes services and NodePort to expose APIs to the frontend.

## Key Features

1. **User Authentication**
  - Secure user authentication with JWT (JSON Web Token).
  - Users can sign up, log in, and securely manage their sessions.
  - The backend handles authentication and authorization using secure endpoints.

2. **Transaction Management**
  - Users can add, delete or view their income and expenses transactions.
  - The app provides endpoints to view and add financial transactions.

3. **User-Friendly Frontend**
  - The Angular frontend provides a responsive and dynamic UI for users to view their created transactions for the current month.
  - Integrated routes for viewing transactions dashboard and create transactions after login or sign up.

4. **Kubernetes Deployment**
  - The application is deployed in a Kubernetes cluster, with services exposed using NodePort.
  - Backend services and databases (MongoDB) are containerized using Docker and orchestrated by Kubernetes for scalability and resilience.

5. **Proxy and Direct API Communication**
  - Initially using an Angular proxy to forward API requests, the app was later updated to communicate directly with backend services exposed via Kubernetes NodePort, eliminating the need for proxy configuration.

6. **CORS Configuration**
  - The backend is configured to handle Cross-Origin Resource Sharing (CORS) requests, ensuring secure communication between the frontend and backend when they are running on different domains or ports.

## Technology Stack

- **Frontend**: Angular, HTML, CSS, TypeScript, Node.js (As http server)
- **Backend**: Spring Boot, Maven
- **Database**: MongoDB (running inside a Kubernetes cluster)
- **Containerization**: Docker (containers for frontend, backend, and database)
- **Orchestration**: Kubernetes (managing the containerized services)
- **API Communication**: HTTP (REST APIs)
- **Authentication**: JWT-based authentication
- **DevOps Tools**: Docker Desktop (for local development), `kubectl` (for managing Kubernetes cluster)

## Deployment Architecture

The application is deployed on a Kubernetes cluster with the following services under budget-tracker namespace:

1. **budget-tracker-api-service**: Exposes the backend API via NodePort for external access.
2. **budget-tracker-store-service**: Handles MongoDB operations for data storage.
3. **budget-tracker-web-service**: Hosts the Angular frontend, which interacts with the API.

The application makes use of **NodePort** for exposing the backend API, and all services are interconnected within the Kubernetes cluster using internal DNS (e.g., `budget-tracker-api-service.budget-tracker.svc.cluster.local`).

## Getting Started

### Prerequisites
- **Docker**: Installed for containerization.
- **Kubernetes**: Installed and configured (e.g., Docker Desktop with Kubernetes enabled).
- **Node.js**: Required for building and running the Angular frontend and backend API.

## How to Use

### 1. Create Kubernetes Namespace and MongoDB StatefulSet (Run below commands from inside kubernates-deployment directory)

```bash
kubectl apply -f namespace.yaml
kubectl apply -f mongo-db-password-secret.yaml
kubectl apply -f database.yaml
```


### 2. Build Tracker API Java Module (Run below commands from inside tracker-api directory)
```bash
mvn clean package docker:build
kubectl apply -f ../kubernates-deployment/tracker-api.yaml
```

### 3. Build Tracker Web Angular Module (Run below commands from inside tracker-api directory)
```bash
mvn clean package docker:build
ng build --configuration production
docker build -t pa2577/tracker-web:latest .
kubectl apply -f ../kubernates-deployment/tracker-web.yaml
```
