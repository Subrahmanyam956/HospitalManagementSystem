from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow cross-origin requests

# Sample users with roles
users = {
    "admin@example.com": {"password": "adminpass", "role": "admin"},
    "doctor@example.com": {"password": "doctorpass", "role": "doctor"},
    "patient@example.com": {"password": "patientpass", "role": "patient"},
}

# Sample data
employees = [
    {"id": 1, "name": "John Doe", "position": "Administrator"},
    {"id": 2, "name": "Jane Smith", "position": "Nurse"},
]

doctors = [
    {"id": 1, "name": "Dr. Alice Brown", "specialty": "Cardiology"},
    {"id": 2, "name": "Dr. Bob White", "specialty": "Neurology"},
]

appointments = [
    {"id": 1, "patient_name": "Patient A", "doctor": "Dr. Alice Brown", "date": "2024-10-28", "time": "10:00 AM"},
    {"id": 2, "patient_name": "Patient B", "doctor": "Dr. Bob White", "date": "2024-10-28", "time": "11:00 AM"},
]

private_rooms = [
    {"id": 1, "room_number": "101", "status": "Occupied"},
    {"id": 2, "room_number": "102", "status": "Available"},
]

# Sample data
# doctors = {
#     1: {"id": 1, "name": "John Doe", "specialty": "Cardiology"},
#     2: {"id": 2, "name": "Jane Smith", "specialty": "Pediatrics"},
# }

appointments = [
    {"id": 1, "doctor_id": 1, "patient_name": "Alice", "date": "2024-10-28", "time": "10:00 AM"},
    {"id": 2, "doctor_id": 1, "patient_name": "Bob", "date": "2024-10-28", "time": "11:00 AM"},
]


patients = {
    1: {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "phone": "123-456-7890",
        "medicalHistory": [
            {"description": "Allergy to penicillin", "treated_by": "Dr. John Doe"},
            {"description": "Had a flu vaccination in 2023", "treated_by": "Dr. Jane Smith"},
        ],
    },
    2: {
        "id": 2,
        "name": "Bob Smith",
        "email": "bob@example.com",
        "phone": "987-654-3210",
        "medicalHistory": [],
    },
}


# Login route
@app.route('/api/login', methods=['POST'])
def login():
    try:
        # Parse JSON data from the request
        data = request.get_json()
        
        # Check if both email and password are provided
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Missing email or password"}), 400

        email = data['email']
        password = data['password']

        # Check if the user exists and the password is correct
        user = users.get(email)
        if user and user["password"] == password:
            return jsonify({
                "message": "Login successful!",
                "role": user["role"]
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message for debugging



# Define endpoints
@app.route('/api/employees', methods=['GET'])
def get_employees():
    return jsonify(employees), 200

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    return jsonify(doctors), 200

@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    return jsonify(appointments), 200

@app.route('/api/private_rooms', methods=['GET'])
def get_private_rooms():
    return jsonify(private_rooms), 200


@app.route('/api/doctors/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = doctors.get(doctor_id)
    if doctor:
        return jsonify(doctor)
    return jsonify({"error": "Doctor not found"}), 404

@app.route('/api/appointments/today', methods=['GET'])
def get_today_appointments():
    doctor_id = request.args.get('doctorId', type=int)
    date = request.args.get('date', type=str)
    
    today_appointments = [appt for appt in appointments if appt['doctor_id'] == doctor_id and appt['date'] == date]
    return jsonify(today_appointments)


@app.route('/api/patients/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = patients.get(patient_id)
    if patient:
        return jsonify(patient)
    return jsonify({"error": "Patient not found"}), 404


# Run the Flask app on port 5000
if __name__ == "__main__":
    app.run(port=5000)
