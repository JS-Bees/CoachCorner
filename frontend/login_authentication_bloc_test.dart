import 'package:bloc_test/bloc_test.dart';

void main() {
  group('LoginAuthenticationBloc()', () {
    final user = MockUser(
      isAnonymous: false,
      uid: 'someuid',
      email: 'jedroPagayonan@gmail.com',
      displayName: 'Jed',
    );

    String email = 'jedroPagayonan@gmail.com';
    String password = '123456';
    String message = 'invalid email or password.';

    final fakeFirebaseAuth = MockFirebaseAuth(mockUser: user);
    blocTest(
      'emits [] when nothing is added.',
      build: () => LoginAuthenticationBloc(),
      expect: () => [],
    );

    blocTest(
      'emits LoginAuthenticationSuccess when login() is called and the user credentials are valid.',
      build: () => LoginAuthenticationBloc(firebaseAuth: fakeFirebaseAuth),
      act: (LoginAuthenticationBloc bloc) {
        return bloc.login(email, password);
      },
      expect: () {
        return [
          LoginAuthenticationLoading(),
          LoginAuthenticationSuccess(email)
        ];
      },
    );

    blocTest(
      'emits LoginAuthenticationError when login() is called and the user credentials are invalid',
      build: () => LoginAuthenticationBloc(firebaseAuth: fakeFirebaseAuth),
      act: (LoginAuthenticationBloc bloc) {
        return bloc.login('error@gmail.com', password);
      },
      expect: () {
        return [
          LoginAuthenticationLoading(),
          LoginAuthenticationError(message)
        ];
      },
    );

    blocTest(
      'emits LoginAuthenticationReinitialize if reinitialize() is called.',
      build: () => LoginAuthenticationBloc(firebaseAuth: fakeFirebaseAuth),
      act: (LoginAuthenticationBloc bloc) {
        return bloc.reinitialize();
      },
      expect: () {
        return [LoginAuthenticationInitial()];
      },
    );
  });
}
