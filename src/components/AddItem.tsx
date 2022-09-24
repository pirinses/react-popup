import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
    openModal: boolean;
    closeModal: () => void;
    setGridContent: any;
    currentData: any;
}

interface FormValues {
    name: string;
    age: string;
}

const initialValues: FormValues = {
    name: "",
    age: "",
};

const AddItem: React.FC<Props> = ({
    openModal,
    closeModal,
    setGridContent,
    currentData,
}) => {
    const [showForm, setShowForm] = useState(openModal);
    const [item, setItem] = useState({});
    const [itemData, setItemData] = useState<Array<any>>([]);

    // mounted
    useEffect(() => {
        setShowForm(openModal);
        formik.setFieldValue("age", undefined);
        formik.setFieldValue("name", "");
    }, [openModal]);

    //  Events
    const handleClose = () => {
        setShowForm(false);
        closeModal();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
            console.table("item data ", itemData);
            setGridContent([
                ...currentData,
                {
                    name: values.name,
                    age: values.age,
                },
            ]);
            closeModal();
        },
    });

    return (
        <Modal
            show={showForm}
            onHide={handleClose}
            centered
            onSubmit={formik.handleSubmit}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add something here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group row">
                    <div className="col-lg-4">
                        <label className="col-form-label">Name</label>
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control form-control-sm"
                            aria-label="Name"
                            {...formik.getFieldProps("name")}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-4">
                        <label className="col-form-label">Age</label>
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="number"
                            autoComplete="off"
                            className="form-control form-control-sm"
                            aria-label="age"
                            {...formik.getFieldProps("age")}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={formik.submitForm}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddItem;
