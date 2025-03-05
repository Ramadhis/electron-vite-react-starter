export const submitAddUser = (event, opts) => {
  try {
    console.log(event, opts);
    event.sender.send("submit:success", { success: true });
  } catch (error) {
    event.sender.send("submit:success", { success: false });
  }
};
