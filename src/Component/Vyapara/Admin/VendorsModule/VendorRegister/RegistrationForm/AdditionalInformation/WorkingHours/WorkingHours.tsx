import { ErrorMessage, Field } from "formik";
import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

const WorkingHours = () => {
  const predefinedWorkingHours = [
    { day: "Mon", open: "10:00 AM", close: "07:00 PM", is_closed: "0" },
    { day: "Tue", open: "10:00 AM", close: "07:00 PM", is_closed: "0" },
    { day: "Wed", open: "10:00 AM", close: "07:00 PM", is_closed: "0" },
    { day: "Thu", open: "10:00 AM", close: "07:00 PM", is_closed: "0" },
    { day: "Fri", open: "10:00 AM", close: "07:00 PM", is_closed: "0" },
    { day: "Sat", open: "", close: "", is_closed: "1" }, // Closed
    { day: "Sun", open: "", close: "", is_closed: "1" }, // Closed
  ];
  return (
    <>
      <FormGroup>
        <Label>Working Hours</Label>
        <Field name="working_hours">
          {({ form }: any) => {
            // Combine current Formik values with predefined options
            const currentValues = form.values.working_hours || [];

            const options = predefinedWorkingHours.map((w, i) => ({
              value: i,
              label:
                w.is_closed === "1"
                  ? `${w.day} - Closed`
                  : `${w.day} - ${w.open} to ${w.close}`,
              data: w, // keep the full object for Formik
            }));

            // Map from day to its index for stable value lookup
            const dayIndexMap = new Map(
              predefinedWorkingHours.map((w, i) => [w.day, i] as const)
            );

            // Map Formik selected values
            const selectedValues = currentValues.map((w: any) => {
              const found = predefinedWorkingHours.find((opt) => opt.day === w.day);
              const idx = dayIndexMap.get(w.day) ?? (found ? predefinedWorkingHours.indexOf(found) : 0);
              return {
                value: idx,
                label:
                  String(w.is_closed) === "1"
                    ? `${w.day} - Closed`
                    : `${w.day} - ${w.open} to ${w.close}`,
                data: w,
              };
            });

            return (
              <Select
                isMulti
                name="working_hours"
                options={options}
                value={selectedValues}
                classNamePrefix="react-select"
                placeholder="Add working hours..."
                onChange={(selectedOptions: any) => {
                  const formatted = selectedOptions.map((opt: any) => ({
                    id: opt.value,
                    day: opt.data.day,
                    open: opt.data.open,
                    close: opt.data.close,
                    is_closed: opt.data.is_closed,
                  }));
                  form.setFieldValue("working_hours", formatted);
                }}
              />
            );
          }}
        </Field>

        <ErrorMessage
          name="working_hours"
          component="span"
          className="text-danger"
        />
      </FormGroup>
    </>
  );
};

export default WorkingHours;
