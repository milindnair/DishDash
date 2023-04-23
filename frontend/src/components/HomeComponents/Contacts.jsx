import Card from "./Card";

const Contacts = () => {
  return (
    
      <Card height={500} width={300}>
        <ul className="space-y-4">
          <li>
            <Card height={100} width={265} />
          </li>
          <li>
            <Card height={100} width={265} />
          </li>
          <li>
            <Card height={100} width={265} />
          </li>
        </ul>
      </Card>
   
  );
};

export default Contacts;
