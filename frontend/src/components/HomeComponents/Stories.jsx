import Card from "./Card"

const Stories = () => {
    return(
        <div className="flex flex-row gap-3">
        <Card height={200} width={140} />
        <Card height={200} width={140} />
        <Card height={200} width={140} />
        <Card height={200} width={140} />
        <Card height={200} width={140} />
        </div>
    )
};

export default Stories;