interface NewRequestProps {
  userid: string;
}
const NewRequest: React.FC<NewRequestProps> = ({ userid }: NewRequestProps) => {
  return (
    <>
      <h3>{userid}</h3>
      <form>
        <label>day</label>
        <input type="date" />
        <br />
        <label>start</label>
        <input type="time" />
        <br />
        <label>end</label>
        <input type="time" />
        <br />
      </form>
    </>
  );
};
export default NewRequest;
