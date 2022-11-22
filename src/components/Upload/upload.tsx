import React, { FC, PropsWithChildren, ChangeEvent } from 'react';
import axios from 'axios';

export interface Props {
  [k: string]: any;
}

const Upload: FC<PropsWithChildren<Props>> = () => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const uploadFile = files[0];
      const formData = new FormData();
      formData.append(uploadFile.name, uploadFile);
      const res = await axios.post(
        // 'https://jsonplaceholder.typicode.com/posts',
        'https://picurl.cn/unionApi/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            sign: '57ba5074c7952c0f66c4a2339fb4fc56',
            id: 12345,
            ts: new Date().valueOf()
          }
        }
      );

      console.log('res', res);
    }
  };
  return (
    <div>
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
