import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// };

export default AddCabin;
