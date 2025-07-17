export const extractPublicId = (cloudinaryUrl:string) => {
  // Extract public ID from your existing URL format
  const match = cloudinaryUrl.match(/\/upload\/v\d+\/(.+)\./);
  return match ? match[1] : cloudinaryUrl;
};
