export const guid = {
  new: () => {
    const blob = URL.createObjectURL(new Blob());
    const arr = blob.split("/");
    return arr[arr.length - 1];
  },
};
