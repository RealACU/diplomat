"use client"
import Swal from 'sweetalert2'
import  './Contact.css'

const page = () => {
    //@ts-ignore
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "73ef8272-59c7-44b9-a56e-8b24df3de135");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          Swal.fire({
            title: "Sucess!",
            text: "Message send successfully!",
            icon: "success", 
          });
        }
      };

    return (
        <section 
            className="contact">
                <form onSubmit={onSubmit}>
                    <h2>Contact Form</h2>
                    <div className="input-box">
                        <label>
                            Full Name 
                        </label> 
                        <input type="text" className="field" placeholder='Enter Your Name' name='name' required/>
                    </div>

                    <div className="input-box">
                        <label> 
                            Email Address
                        </label>
                            <input type="text" className="field" placeholder="Enter Your Email Address" name='email' required />
                    </div>
                    <div className="input-box">
                        <label> 
                            Your Message
                        </label>
                            <textarea name="message" className="field mess" placeholder="Enter Your Message"  required />
                    </div>
                    <div className="input-button">
                        <button className=" fields button" type="submit"> 
                            Send Message
                        </button>
                    </div>
                </form>
        </section>
    );
}

export default page;