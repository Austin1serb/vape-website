import { getData } from "@/api/routes";
import { NextPage } from "next";

const page: NextPage = async () => {
	const endpoint = "product";
	const _id = "65e129d55b01000cbf9166be";
	const res = await getData(endpoint, _id);
	return (
		<div>
			<div className="h-32 w-32 bg-red-400 text-black">{res.name}</div>
		</div>
	);
};

export default page;
