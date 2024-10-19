import CountryCode from "@/data/countrycode.json";
import SubmitButton from "../Auth/SubmitButton";

export default function ContactUsForm() {
  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="label-style">
            First Name
          </label>
          <input
            type="text"
            className="form-style"
            name="firstname"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="label-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter last name"
            className="form-style"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          className="form-style"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="label-style">
          Phone Number
        </label>

        <div className="flex items-center gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select name="countrycode" className="form-style">
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="tel"
              name="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label-style">
          Message
        </label>
        <textarea
          name="message"
          cols={30}
          rows={7}
          placeholder="Enter your message here"
          className="form-style"
          required
        />
      </div>

      <SubmitButton>Send Message</SubmitButton>
    </form>
  );
}
