import 'package:intl/intl.dart';

void main() {
  group('Appointment', () {
    const Address address =
        Address(addressLine1: 'addressLine1', addressLine2: 'addressLine2');

    final CustomerDetails customerDetails = CustomerDetails(
      phoneNumber: '09259576311',
      landlineNumber: '(033) 320 1212',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      type: 'Private',
      email: 'test@gmail.com',
      address: const Address(
          addressLine1: 'addressLine1', addressLine2: 'addressLine2'),
    );

    final PaymentDetails paymentDetails =
        PaymentDetails(status: 'Pending', amount: 100, method: 'Cash');

    final ServiceDetails serviceDetails = ServiceDetails(
      description: 'sports enthusiast',
      serviceType: 'train',
      unitQuantity: 1,
      unitType: 'volleyball',
    );

    final List<TechnicianDetails> technicians = [
      TechnicianDetails(
        designation: 'master',
        fullName: 'Mark Steven',
        status: 'pending',
        contactNumber: '0956433212',
        workEmail: 'johntechnician@gmail.com',
        personalEmail: 'johnpersonal@gmail.com',
        password: 'password123',
        address: 'Sample address',
        activityStatus: 'Standby',
      ),
    ];

    final DateTime timeCreated = DateTime(2000, 1, 27);

    final AppointmentSchedule appointmentSchedule =
        AppointmentSchedule(dateTime: DateTime(2000, 2, 1, 5, 30));

    group('isValid()', () {
      test('return false if the paymentDetails is invalid.', () {
        final Appointment testAppointment = Appointment(
          address: address,
          customerDetails: customerDetails,
          paymentDetails: null,
          serviceDetails: serviceDetails,
          technicians: technicians,
          timeCreated: timeCreated,
          appointmentSchedule: appointmentSchedule,
        );

        bool result = testAppointment.isValid();

        expect(result, false);
      });

      test('return false if the serviceDetails is invalid.', () {
        final Appointment testAppointment = Appointment(
          address: address,
          customerDetails: customerDetails,
          paymentDetails: paymentDetails,
          serviceDetails: null,
          technicians: technicians,
          timeCreated: timeCreated,
          appointmentSchedule: appointmentSchedule,
        );

        bool result = testAppointment.isValid();

        expect(result, false);
      });

      test('return false if there are no technician.', () {
        final Appointment testAppointment = Appointment(
          address: address,
          customerDetails: customerDetails,
          paymentDetails: paymentDetails,
          serviceDetails: serviceDetails,
          technicians: const [],
          timeCreated: timeCreated,
          appointmentSchedule: appointmentSchedule,
        );

        bool result = testAppointment.isValid();

        expect(result, false);
      });
    });

    group('.formatted', () {
      test(
          'should return formatted version of the Appointment Schedule if appointmentSchedule, customerDetails, and serviceDetails are not null.',
          () {
        final Appointment testAppointment = Appointment(
          address: address,
          customerDetails: customerDetails,
          paymentDetails: paymentDetails,
          serviceDetails: serviceDetails,
          technicians: technicians,
          timeCreated: timeCreated,
          appointmentSchedule: appointmentSchedule,
        );

        String result = testAppointment.formatted;

        expect(result,
            'Appointment Schedule:\n${DateFormat.yMMMMd().add_jm().format(appointmentSchedule.dateTime)}\n\nService Details:\n   ${serviceDetails.serviceType}\n   PHP ${serviceDetails.paymentAmount?.toStringAsFixed(2) ?? 0}\n\n${customerDetails.formatted}');
      });
    });
  });
}
