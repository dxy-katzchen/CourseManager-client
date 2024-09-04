import { uploadImg } from "@/axios/partThree";

const Upload = async (files, callback) => {
  const res = await Promise.all(
    files.map(async (file) => {
      return await uploadImg(file);
    })
  );

  callback(
    res.map((item) => {
      switch (item.data.code) {
        case "success":
          return item.data.data.url;
        case "image_repeated":
          return item.data.images;
        default:
          ElMessage.error("Upload Failed");
          break;
      }
    })
  );
};

export default Upload;
