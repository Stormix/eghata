import { Form } from 'react-router-dom';
import TextInput from '@/components/molecules/text-input';
import TextAreaInput from '@/components/molecules/text-area-input';
import FileInput from '@/components/molecules/file-input';
import MapInput from '@/components/molecules/map-input';

const HelpRequestForm = () => {
  return (
    <Form>
      <div className="flex flex-col w-full h-full gap-4 px-4">
        <h1 className="text-2xl">Help Request</h1>
        <TextInput title="What is your name" placeholder="Full Name" isOptional={false} />
        <TextInput title="What is your email" placeholder="Email" isOptional={false} />
        <TextInput title="What is your address" placeholder="Address" isOptional={false} />
        <MapInput title="Exact location that needs help" isOptional={false} />
        <TextAreaInput
          title="Can you give us more info about the situation"
          placeholder="Type your message here"
          isOptional={true}
        />
        <TextAreaInput title="Source of information" placeholder="Type your message here" isOptional={true} />
        <FileInput title="Upload pictures" isOptional={false} />
      </div>
    </Form>
  );
};

export default HelpRequestForm;
