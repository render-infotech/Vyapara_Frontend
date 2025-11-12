import { ErrorMessage, Field } from "formik";
import React from "react";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";

const Materials = () => {
  const materialOptions = [
    { value: "Gold", label: "Gold" },
    { value: "Silver", label: "Silver" },
  ];
  return (
    <>
      <FormGroup>
        <Label>Materials</Label>
        <Field name="materials">
          {({ form }: any) => {
            const selectedMaterials = (form.values.materials || []).map(
              (m: any) => ({
                value: typeof m === "string" ? m : m.name,
                label: typeof m === "string" ? m : m.name,
              })
            );

            return (
              <>
                <Select
                  isMulti
                  name="materials"
                  options={materialOptions}
                  value={selectedMaterials}
                  //   isLoading={materialsLoading}
                  classNamePrefix="react-select"
                  placeholder="Add materials..."
                  onChange={(selectedOptions: any) => {
                    const formatted = selectedOptions.map((opt: any) => ({
                      name: opt.value,
                    }));
                    form.setFieldValue("materials", formatted);
                  }}
                />
              </>
            );
          }}
        </Field>

        <ErrorMessage
          name="materials"
          className="text-danger"
          component="span"
        />
      </FormGroup>
    </>
  );
};

export default Materials;
