import React , {useState} from 'react'
import './Profile.css'
import Header from '../components/header/Header'
import { useContext } from 'react';
import { UserContext } from '../components/contexts/UserContext'


export default function Profile({setUser}) {
  
  const { user } = useContext(UserContext); 
  const [edit, setEdit] = useState(user);
  const [imageFile, setImageFile] = useState(null);

  function editProfile(event) {
    const { name, value } = event.target;
    setEdit(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user[full_name]", edit.full_name);
    formData.append("user[email]", edit.email);
    formData.append("user[password]", edit.password);
    formData.append("user[image]", imageFile);
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setImageFile(null);
          setUser({
            ...user,
            full_name: formData.get("user[full_name]"),
            email: formData.get("user[email]"),
            password: formData.get("user[password]"),
            image: formData.get("user[image]"),
          });
          
        } else if (response.status === 422) {
          // Update failed - display validation errors
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        } else {
          // Display other error messages returned by the server
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error(error);
        // Display error message to the user
      });
    };
    
    
    const userImage = localStorage.getItem("userImage");

  return (
      <>
      <Header setUser={setUser}/>
      <div className="container">
          <h1 className="edit-profile">Edit Profile</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="text-center">
              {userImage && (
            <img className="avatar" src={userImage} alt="User" />
          )}   
              <h6>Upload a different photo...</h6>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = () => {
                    setEdit((prevState) => ({ ...prevState, image: reader.result }));
                  };
                }}
              
                name="image"/>
                  </div>
              </div>
    
      <div className="col-md-9 personal-info">
        <div className="alert alert-info alert-dismissable">
          <i className="fa fa-coffee"></i>
          Please Save Changes after editing your Profile
        </div>
        <h3>Personal info</h3>
        
        <form className="form-horizontal, form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="col-lg-3 control-label">First name:</label>
            <div className="col-lg-8">
              <input className="form-control" 
              type="text" 
              value={edit.full_name} 
              onChange={editProfile}
              name="full_name"/>
            </div>
          </div>
          
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input 
              className="form-control" 
              type="text" 
              value={edit.email} 
              onChange={editProfile}
              name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Password:</label>
            <div className="col-md-8">
              <input
              className="form-control" 
              type="password" 
              value={edit.password}
              name="password"
              onChange={editProfile}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <button type="submit" className="btn btn-primary" value="Save Changes">Submit</button> 
              <span></span>
              <input type="reset" className="btn btn-default" value="Cancel"/>
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
<hr></hr>
  </>

  )
}
