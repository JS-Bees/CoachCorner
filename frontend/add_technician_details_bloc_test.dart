import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gimaly_ac_services/blocs/add_technician_details/add_technician_details_bloc.dart';
import 'package:gimaly_ac_services/classes/technician_details.dart';

void main() {
  group('AddTechnicianDetailsBloc()', () {
    String fullName = 'Jerry Waterman';
    String contactNumber = '09533611680';
    String designation = 'Smallville, USA';
    String status = 'Available';
    String address = 'Sample technician address';
    String workEmail = 'j.waterman67@gmail.com';
    String password = 'password123';
    String activityStatus = 'Standby';
    String personalEmail = 'personality67@gmail.com';

    List<TechnicianDetails> technicians = [
      TechnicianDetails(
        designation: designation,
        fullName: fullName,
        status: status,
        contactNumber: contactNumber,
        workEmail: workEmail,
        personalEmail: personalEmail,
        password: password,
        address: address,
        activityStatus: activityStatus,
      )
    ];

    blocTest(
      'emits [] when nothing is added',
      build: () => AddTechnicianDetailsBloc(),
      expect: () => [],
    );

    blocTest(
      'emits AddTechnicianDetailsSuccess when addTechnician is called.',
      build: () => AddTechnicianDetailsBloc(),
      act: (AddTechnicianDetailsBloc bloc) {
        return bloc.addTechnician(
          fullName,
          contactNumber,
          designation,
          status,
          workEmail,
          personalEmail,
          password,
          address,
          activityStatus,
        );
      },
      expect: () {
        return [AddTechnicianDetailsSuccess(technicians)];
      },
    );

    blocTest(
      'emits AddTechnicianDetailsError when addTechnician is called and contact number or email is invalid',
      build: () => AddTechnicianDetailsBloc(),
      act: (AddTechnicianDetailsBloc bloc) {
        return bloc.addTechnician(
          fullName,
          'invalid contact number',
          designation,
          status,
          personalEmail,
          'invalid email',
          password,
          address,
          activityStatus,
        );
      },
      expect: () {
        return const [AddTechnicianDetailsError(invalidAddMessage)];
      },
    );

    blocTest(
      'emits AddTechnicianDetailsSuccess when removeTechnician is called.',
      build: () => AddTechnicianDetailsBloc(),
      act: (AddTechnicianDetailsBloc bloc) {
        return bloc.removeTechnician(
          fullName,
          contactNumber,
          designation,
          status,
          workEmail,
          personalEmail,
          password,
          address,
          activityStatus,
        );
      },
      expect: () {
        return const [AddTechnicianDetailsSuccess([])];
      },
    );

    // blocTest(
    //   'emits AddTechnicianDetailsError when removeTechnician is called.'
    // )
  });
}
