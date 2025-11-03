import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { VendorManagement } from "../../../../utils/Constant";
import VendorsTab from "./VendorsTable/VendorsTab";
import { Link } from "react-router-dom";
import { Btn } from "../../../../AbstractElements";
import { Field, FieldProps, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { Vendor } from "../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import axiosCall from "../../../../Api/APIcall";
import { toast } from "react-toastify";
import { setAllVendors } from "../../../../ReduxToolkit/Reducers/Vendors/VendorTabSlice";

// location filter options will be derived from vendor data

export interface VendorApiResponse {
  data: Vendor[];
  message: string;
  status: number;
}

function VendorModule() {
  const dispatch = useAppDispatch();
  const { allVendors } = useAppSelector((state) => state.vendorTab);

  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const locationOptions = useMemo(() => {
    const unique = Array.from(
      new Set((allVendors || []).map((v) => (v.city || "").trim()).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
    return [{ id: "", label: "All" }, ...unique.map((loc) => ({ id: loc, label: loc }))];
  }, [allVendors]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const { data } = await axiosCall<VendorApiResponse>({
          ENDPOINT: `vendor/all`,
          METHOD: "GET",
        });

        if (data.data) {
          dispatch(setAllVendors(data.data)); // ✅ save to redux
        } else {
          toast.error(data.message || "Failed to fetch vendors");
        }
      } catch (error) {
        toast.error("Failed to fetch vendors");
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [dispatch]);

  // ✅ filter change handler
  const handleScheduleListForm = (values: { scheduling_list_id: string }) => {
    setSelectedLocation(values.scheduling_list_id);
  };

  return (
    <>
      <Breadcrumbs mainTitle={VendorManagement} parent={VendorManagement} />
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              {/* Filter Section */}
              <Col md="6" className="mt-3 mb-4">
                <Formik
                  initialValues={{ scheduling_list_id: "" }}
                  onSubmit={handleScheduleListForm}
                >
                  {({ setFieldValue, values }) => (
                    <Form className="theme-form">
                      <Row className="g-2">
                        <Col md="12">
                          <FormGroup>
                            <Label check>Filter By Location</Label>
                            <Field name="scheduling_list_id">
                              {({ field }: FieldProps) => (
                                <select
                                  {...field}
                                  className="form-control"
                                  onChange={(e) => {
                                    const selected = String(e.target.value);
                                    setFieldValue(field.name, selected);
                                    setSelectedLocation(selected);
                                  }}
                                >
                                  {locationOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </Field>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>

              {/* Add Vendor Button */}
              <Col
                sm="6"
                className="mt-3 mb-4 d-flex justify-content-end"
              >
                <Link to="">
                  <Btn color="primary">
                    <i className="fa fa-plus-circle me-2" />
                    Add New Vendor
                  </Btn>
                </Link>
              </Col>

              {/* Vendors Table */}
              <Col sm="12">
                <VendorsTab
                  selectedLocation={selectedLocation}
                  vendors={allVendors}
                  loading={loading}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default VendorModule;
