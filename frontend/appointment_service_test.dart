import 'package:flutter_test/flutter_test.dart';

void main() {
  group('AppointmentService', () {
    List<Appointment> appointments = [
      Appointment(
        status: AppointmentStatuses.inProgress,
        timeCreated: DateTime(2021, 1, 10),
        appointmentSchedule:
            AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
        serviceDetails: ServiceDetails(
            serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
      ),
      Appointment(
        status: AppointmentStatuses.completed,
        timeCreated: DateTime(2021, 10, 9),
        appointmentSchedule:
            AppointmentSchedule(dateTime: DateTime(2021, 10, 9)),
        serviceDetails: ServiceDetails(
            serviceType: "Cleaning", unitType: "Window Type", unitQuantity: 1),
      ),
      Appointment(
        status: AppointmentStatuses.inProgress,
        timeCreated: DateTime(2022, 3, 5),
        appointmentSchedule:
            AppointmentSchedule(dateTime: DateTime(2022, 3, 5)),
        serviceDetails: ServiceDetails(
            serviceType: "Installation",
            unitType: "Window Type",
            unitQuantity: 1),
      )
    ];

    group('.sortAppointmentsByDate()', () {
      test(
          'should sort appointments from oldest to most recent if ascending is true',
          () {
        List<Appointment> results = [...appointments];

        AppointmentService.sortAppointmentsByDate(results, true);

        expect(results, [
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2021, 1, 10),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.completed,
            timeCreated: DateTime(2021, 10, 9),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 10, 9)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning",
                unitType: "Window Type",
                unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2022, 3, 5),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2022, 3, 5)),
            serviceDetails: ServiceDetails(
                serviceType: "Installation",
                unitType: "Window Type",
                unitQuantity: 1),
          )
        ]);
      });

      test(
          'should sort appointments from most recent to oldest if ascending is false',
          () {
        List<Appointment> results = [...appointments];

        AppointmentService.sortAppointmentsByDate(results, false);

        expect(results, [
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2022, 3, 5),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2022, 3, 5)),
            serviceDetails: ServiceDetails(
                serviceType: "Installation",
                unitType: "Window Type",
                unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.completed,
            timeCreated: DateTime(2021, 10, 9),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 10, 9)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning",
                unitType: "Window Type",
                unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2021, 1, 10),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
          ),
        ]);
      });
    });

    group('.filterAppointmentsByMonth()', () {
      test('should return appointments with the specified month only', () {
        List<Appointment> results =
            AppointmentService.filterAppointmentsByMonth(
                appointments, FilterMonth.january);

        expect(results, [
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2021, 1, 10),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
          ),
        ]);
      });
    });

    group('.filterAppointmentsByStatus()', () {
      test('should return appointments with the specified status only', () {
        List<Appointment> results =
            AppointmentService.filterAppointmentsByStatus(
                appointments, AppointmentStatuses.inProgress);

        expect(results, [
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2021, 1, 10),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2022, 3, 5),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2022, 3, 5)),
            serviceDetails: ServiceDetails(
                serviceType: "Installation",
                unitType: "Window Type",
                unitQuantity: 1),
          )
        ]);
      });
    });

    group('.filterAppointmentsByServiceType()', () {
      test('should return appointments', () {
        List<Appointment> results =
            AppointmentService.filterAppointmentsByServiceType(
                appointments, FilterServiceType.cleaning);

        expect(results, [
          Appointment(
            status: AppointmentStatuses.inProgress,
            timeCreated: DateTime(2021, 1, 10),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
          ),
          Appointment(
            status: AppointmentStatuses.completed,
            timeCreated: DateTime(2021, 10, 9),
            appointmentSchedule:
                AppointmentSchedule(dateTime: DateTime(2021, 10, 9)),
            serviceDetails: ServiceDetails(
                serviceType: "Cleaning",
                unitType: "Window Type",
                unitQuantity: 1),
          ),
        ]);
      });
    });

    group('.changeStatusByDate(appointment)', () {
      test(
          'should return appointment with status completed if the appointment date is in the past',
          () {
        Appointment appointmentYesterday = Appointment(
          status: AppointmentStatuses.inProgress,
          timeCreated: DateTime(2021, 1, 10),
          appointmentSchedule:
              AppointmentSchedule(dateTime: DateTime(2021, 1, 10)),
          serviceDetails: ServiceDetails(
              serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
        );

        DateTime now = DateTime(2021, 1, 11);

        Appointment updatedAppointment =
            AppointmentService.changeStatusByDate(appointmentYesterday, now);

        expect(updatedAppointment.status, AppointmentStatuses.completed);
      });

      test(
          'should return appointment with status upcoming if the appointment date is the present date',
          () {
        Appointment appointmentToday = Appointment(
          status: AppointmentStatuses.pending,
          timeCreated: DateTime(2021, 1, 10),
          appointmentSchedule:
              AppointmentSchedule(dateTime: DateTime(2021, 1, 10, 9)),
          serviceDetails: ServiceDetails(
              serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
        );

        DateTime now = DateTime(2021, 1, 10, 8);

        Appointment updatedAppointment =
            AppointmentService.changeStatusByDate(appointmentToday, now);

        expect(updatedAppointment.status, AppointmentStatuses.upcoming);
      });

      test(
          'should return appointment with status in-progress if the appointment date is past the appointment time and it is in the present day',
          () {
        Appointment appointmentToday = Appointment(
          status: AppointmentStatuses.inProgress,
          timeCreated: DateTime(2021, 1, 10),
          appointmentSchedule:
              AppointmentSchedule(dateTime: DateTime(2021, 1, 10, 9, 30)),
          serviceDetails: ServiceDetails(
              serviceType: "Cleaning", unitType: "Split", unitQuantity: 1),
        );

        DateTime now = DateTime(2021, 1, 10, 10, 30);

        Appointment updatedAppointment =
            AppointmentService.changeStatusByDate(appointmentToday, now);

        expect(updatedAppointment.status, AppointmentStatuses.inProgress);
      });
    });
  });
}
