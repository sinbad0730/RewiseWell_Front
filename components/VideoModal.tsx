import Modal from "./Modal";

export default function VideoModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal isOpen={isOpen} maxWidth={1200} title="" closeModal={closeModal}>
      <div>
        <video controls autoPlay className="rounded-md">
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
}
