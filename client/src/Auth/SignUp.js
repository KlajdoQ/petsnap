import React , {useState} from 'react'
import './SignUp.css'

export default function SignUp({setUser}) {
  let [signUpForm, setSignUpForm] = useState({
    full_name: "",
    email: "",
    password: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);

  
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user[full_name]", signUpForm.full_name);
    formData.append("user[email]", signUpForm.email);
    formData.append("user[password]", signUpForm.password);
    formData.append("user[image]", imageFile);
  
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const imageUrl = reader.result;
      localStorage.setItem("userImage", imageUrl);
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            window.location.replace("/login");
          } else if (response.status === 422) {
            return response.json().then((data) => {
              throw new Error(data.errors.join(", "));
            });
          } else {
            throw new Error(response.statusText);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  };
  
  const handleSignUpFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((prevState) => ({ ...prevState, [name]: value }));
  };
  
  function changeAuthMode (e) {
    e.preventDefault();
    window.location.replace('/login')
  }
  function handleImageChange (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSignUpForm((prevState) => ({ ...prevState, image: reader.result }));
      };
      setImageFile(file);
    }
  };
  return (
    <div className="signup-page">

    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSignUpSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Log In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={signUpForm.full_name}
              name="full_name"
            onChange={handleSignUpFormChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={signUpForm.email}
              onChange={handleSignUpFormChange}
              name="email"
            />
          </div>
          <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            onChange={handleImageChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={signUpForm.password}
              onChange={handleSignUpFormChange}
              name="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          </p>
        </div>
      </form>
    </div>
    </div>
  )
}
