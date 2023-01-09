export function onSaveState(state: any) {
  delete state.signup;
  return state;
}
