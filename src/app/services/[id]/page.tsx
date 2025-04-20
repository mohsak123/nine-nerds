import DataServices from "@/components/services/DataServices";


type ServicesProps = {
  id:number;
  name:string;
  cover_image:string;
  builtin:number;
}

const Page = async({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;
  const serviceId = parseInt(id);

  
  let data:ServicesProps[] = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?with_projects=0&builtin=0`,{
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Field to fetch services")
    }

    const allData = await response.json();

    data = allData.data || [];

  } catch (err) {
    console.error("Error fetching services:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-center pt-20 text-[18px] sm:text-[24px] font-semibold">No services found.</p>
      </div>
    );
  }

  return (
    <div className='pt-[165px] px-[30px] lg:px-[60px]'>
      <div className='text-[32px] sm:text-[45px] lg:text-[60px] text-center font-bold mb-[45px] sm:mb-[60px]'>
        OUR Services
      </div>
      <DataServices data={data} serviceId={serviceId} />
    </div>
  );
}

export default Page;
