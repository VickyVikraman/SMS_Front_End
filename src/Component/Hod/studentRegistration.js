
import { Upload, Button, Icon, notification } from 'antd';
import React from 'react'
import { API_BASE_HOD_URL, ACCESS_TOKEN } from './../../constants';

const props = {
  name: 'file',
  action: API_BASE_HOD_URL+"/uploadFile",
  headers: {
    authorization: 'Bearer '+ACCESS_TOKEN,
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      notification.success({
        message: 'Student Management System',
        description: 'Student Login Details Created Successfully'
    });
    } else if (info.file.status === 'error') {
      console.log(info.file);
      debugger
      notification.error({
        message: 'Student Management System',
        description: info.file.response.message
    });
    }
  },
};

class StudentRegistration extends React.Component{

    render(){
        return(
          <div style={{width:"25%"}}>
            <Upload {...props} multiple='false'>
                <Button>
                <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
          </div>
        )
    }
}

export default StudentRegistration