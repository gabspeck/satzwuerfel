import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import firebase from 'firebase';
import 'firebase/auth';
import App from './App.svelte';

before(() => {
  firebase.auth().useEmulator('http://localhost:9099/');
});

describe('<App>', () => {
  it('requires authentication', () => {
    const { getByText } = render(App);
    const titleElement = getByText(/anmelden/i);
    expect(document.body.contains(titleElement));
  });
});