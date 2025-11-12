import { ErrorMessage, Field } from "formik";
import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

const PaymentModes = () => {
    const paymentOptions = [
    { value: "UPI", label: "UPI" },
    { value: "Cash", label: "Cash" },
  ];
  return (
    <>
      <FormGroup>
        <Label>Payment Modes</Label>

        <Field name="payment_modes">
          {({ form }: any) => {
           const selectedPaymentModes = (form.values.payment_modes || []).map(
            (mode: string) => ({
              value: mode,
              label: mode,
            })
            );

            return (
              <Select
                isMulti
                name="payment_modes"
                options={paymentOptions}
                value={selectedPaymentModes}
                classNamePrefix="react-select"
                placeholder="Add payment modes..."
                onChange={(selectedOptions: any) => {
                  const formatted = selectedOptions.map(
                    (opt: any) => opt.value
                  );
                  form.setFieldValue("payment_modes", formatted);
                }}
              />
            );
          }}
        </Field>

        <ErrorMessage
          name="payment_modes"
          className="text-danger"
          component="span"
        />
      </FormGroup>
    </>
  );
};

export default PaymentModes;
