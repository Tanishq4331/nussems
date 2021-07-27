import { Modal, Form } from "react-bootstrap";
import { Header, Button } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useData } from "../../contexts/AppContext";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import RequestTutorForm from "./RequestTutorForm";

export function RequestTutorModal({ setOpen, open }) {
  const { setAlert, userData } = useAuth();
  const { makeRequest } = useData();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    duration: Yup.number()
      .min(1, "Duration too short")
      .max(12, "Duration too long")
      .required("*Duration is required"),
    startDate: Yup.date()
      .min(new Date(), "Invalid date")
      .required("Start date is required"),
    module: Yup.object()
      .required("Please select a module")
      .nullable()
      .test(
        "already-exists",
        "You have an existing request for this module.",
        async (value, testContext) => {
          return value && !userData.requests.includes(value.label);
        }
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("submitting");
    setLoading(true);
    makeRequest(values)
      .then(() => {
        setAlert({
          message: `Request successfully submitted`,
          success: true,
        });
        setLoading(false);
        setOpen(false);
        setSubmitting(false);
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);
        console.log(`${error.code}: ${error.message}`);
        setAlert({ message: "Could not contact server", success: false });
      });
  };

  return (
    <Modal
      size="lg"
      show={open}
      onHide={() => setOpen(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Loading loading={loading} />
      <Modal.Header style={{ padding: "3px" }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="align-items-center">
            <Header>Request a tutor</Header>
          </div>
        </div>
      </Modal.Header>
      <Formik
        initialValues={{
          description: "",
          startDate: undefined,
          module: undefined,
          duration: undefined,
          rate: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <RequestTutorForm />
      </Formik>
    </Modal>
  );
}
