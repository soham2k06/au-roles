import { Role } from "@/components";

function page({ params: { slug: role } }: { params: { slug: string } }) {
  return <Role role={role} />;
}

export default page;
