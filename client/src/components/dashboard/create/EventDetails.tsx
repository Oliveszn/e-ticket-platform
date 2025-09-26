"use client";

import { useState } from "react";
import Toggle from "../Toggle";

interface EventDetailsProps {
  formik: any;
}

const EventDetails = ({ formik }: EventDetailsProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      {/* Event Name */}
      <div className="space-y-2">
        <label htmlFor="event-name" className="text-sm font-bold leading-none">
          Give your event a name.*
        </label>
        <input
          id="event-name"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          placeholder="Enter event name here"
          className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.title && formik.touched.title
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
        />
        <p className="text-slate-500 text-xs">
          See how your name appears on the event page and a list of all places
          where your event name will be used.
        </p>
        {formik.errors.title && formik.touched.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
      </div>

      {/* SLUG */}
      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-bold leading-none">
          Give your event a slug.*
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.slug}
          onBlur={formik.handleBlur}
          placeholder="Unique slug for your event"
          className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.slug && formik.touched.slug
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
        />
        <p className="text-slate-500 text-xs">
          This will be part of your event link, e.g.
          <span className="text-blue-500">
            www.stagepass.com/your-slug-name
          </span>
        </p>
        {formik.errors.slug && formik.touched.slug && (
          <p className="text-red-500 text-sm">{formik.errors.slug}</p>
        )}
      </div>

      {/* DATE AND TIME  */}
      <div className="py-4">
        <p className="text-sm font-bold">When is your event?*</p>
        <p className="text-sm text-gray-800">
          Tell your attendees when your event starts so they can get ready.
        </p>
        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-semibold">
              Event Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.date && formik.touched.date
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.date && formik.touched.date && (
              <p className="text-red-500 text-sm">{formik.errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-semibold">
              Time*
            </label>
            <input
              id="time"
              name="time"
              type="time"
              onChange={formik.handleChange}
              value={formik.values.time}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.time && formik.touched.time
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.time && formik.touched.time && (
              <p className="text-red-500 text-sm">{formik.errors.time}</p>
            )}
          </div>
        </div>
      </div>

      {/* VENUE  */}
      <div className="py-4">
        <p className="text-sm font-bold">Where is your event?*</p>
        <p className="text-sm text-gray-800">
          Tell your attendees where your event is located so they can get ready
          to attend.
        </p>

        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="space-y-2">
            <label htmlFor="event-name" className="text-sm font-semibold">
              Venue*
            </label>
            <input
              id="event-name"
              name="venue.name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.venue.name}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.venue?.name && formik.touched.venue?.name
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            <p className="text-slate-500 text-xs">
              The exact venue of the event, leave blank if venue is not yet
              confirmed
            </p>
            {formik.errors.venue?.name && formik.touched.venue?.name && (
              <p className="text-red-500 text-sm">
                {formik.errors.venue?.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="event-address" className="text-sm font-semibold">
              Address*
            </label>
            <input
              id="event-address"
              name="venue.address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.venue.address}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.venue?.address && formik.touched.venue?.address
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.venue?.address && formik.touched.venue?.address && (
              <p className="text-red-500 text-sm">
                {formik.errors.venue?.address}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-semibold">
              City*
            </label>
            <input
              id="city"
              name="venue.city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.venue.city}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.venue?.city && formik.touched.venue?.city
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.venue?.city && formik.touched.venue?.city && (
              <p className="text-red-500 text-sm">
                {formik.errors.venue?.city}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="state" className="text-sm font-semibold">
              State*
            </label>
            <input
              id="state"
              name="venue.state"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.venue.state}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.venue?.state && formik.touched.venue?.state
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.venue?.state && formik.touched.venue?.state && (
              <p className="text-red-500 text-sm">
                {formik.errors.venue?.state}
              </p>
            )}
          </div>

          <div className="space-y-2 flex items-center gap-6">
            <div>
              <label htmlFor="venue-isPublic" className="text-xs font-bold">
                Make this event venue public?*
              </label>
              <p className="text-xs text-gray-800">
                You can hide event venue from public view
              </p>
            </div>
            <Toggle
              checked={formik.values.venue.isPublic}
              onChange={(val) => formik.setFieldValue("venue.isPublic", val)}
              onLabel="Public"
              offLabel="Private"
            />
          </div>
        </div>
      </div>

      {/* CHARGE  */}
      <div className="space-y-2">
        <p className="text-sm font-bold leading-none"> Charge Responsibility</p>
        <p className="text-slate-500 text-xs">
          Choose who will bear the transaction charges: "Host" means the event
          organizer will cover all the charges, while "Buyers" means the charges
          will be passed on to the end users.
        </p>

        <div className="flex items-center gap-2">
          <input
            id="host"
            name="charge"
            type="radio"
            onChange={formik.handleChange}
            value="Host"
            checked={formik.values.charge === "Host"}
            className={`h-5 text-blue-600 focus:ring-2 focus:ring-blue-500
      ${formik.errors.charge && formik.touched.charge ? "border-red-500" : ""}`}
          />
          <label htmlFor="host" className="text-sm font-bold leading-none">
            Host
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="buyer"
            name="charge"
            type="radio"
            onChange={formik.handleChange}
            value="Buyer"
            checked={formik.values.charge === "Buyer"}
            className={`h-5 text-blue-600 focus:ring-2 focus:ring-blue-500
      ${formik.errors.charge && formik.touched.charge ? "border-red-500" : ""}`}
          />
          <label htmlFor="buyer" className="text-sm font-bold leading-none">
            Buyer
          </label>
        </div>

        {formik.errors.charge && formik.touched.charge && (
          <p className="text-red-500 text-sm">{formik.errors.charge}</p>
        )}
      </div>

      {/* CATEGORY  */}
      <div className="space-y-2 w-full ">
        <label
          htmlFor="category"
          className="text-sm font-bold leading-none mb-2"
        >
          Choose a category:
        </label>

        <select
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            -- Select a category --
          </option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Seminars">Seminars</option>
          <option value="Arts & Culture">Arts & Culture</option>
        </select>
        {formik.errors.category && formik.touched.category && (
          <p className="text-red-500 text-sm">{formik.errors.category}</p>
        )}
      </div>

      {/* DESCRIPTION  */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-bold leading-none">
          Please describe your event*
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          placeholder="About Event"
          className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.description && formik.touched.description
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
        />
        <p className="text-slate-500 text-xs">
          Write a few words below to describe your event and provide any extra
          information such as schedules, itinerary or any special instructions
          required to attend your event.
        </p>
        {formik.errors.description && formik.touched.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>

      {/* IMAGE PART  */}
      <div className="space-y-3 py-8">
        <p className="text-sm font-bold">
          Add a few images to your event banner.*
        </p>
        <p className="text-xs text-gray-800">
          Upload colorful and vibrant images as the banner for your event! See
          how beautiful images help your event details page.
        </p>
        <div>
          <div className="mt-1 flex flex-col justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".jpg,.png,.jpeg,.gif"
                    className="sr-only"
                    name="file-upload"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        formik.setFieldValue("image", file); // store File
                        setPreview(URL.createObjectURL(file)); // to see the image
                      }
                    }}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-4 h-40 w-full object-cover rounded-md"
                    />
                  )}
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {formik.errors.image && formik.touched.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
