@app.route('/snooze', methods=['POST'])
def snooze_email():
    email_id = request.json['email_id']
    snooze_until = request.json['snooze_until']
    # Update the email's status in the database
    db.update_email_status(email_id, 'snoozed', snooze_until)
    return jsonify({'status': 'success'})
