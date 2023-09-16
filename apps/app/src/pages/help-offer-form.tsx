import { Form } from 'react-router-dom';
import TextInput from '@/components/molecules/text-input';
import TextAreaInput from '@/components/molecules/text-area-input';
import FileInput from '@/components/molecules/file-input';
import AssistanceTypeInput from '@/components/molecules/assistance-type-input';
import LocatedOnSiteInput from '@/components/molecules/located-on-site-input';

const HelpOfferForm = () => {
  return (
    <Form>
      <div className="flex flex-col w-full h-full gap-4 px-4">
        <h1 className="text-2xl">Provide Help</h1>
        <TextInput title="What is your name" placeholder="Full Name" isOptional={false} />
        <AssistanceTypeInput title="What are your needs?" isOptional={false} />
        <LocatedOnSiteInput title="Are you located on site?" isOptional={false} />
        <TextInput title="What is your address" placeholder="Address" isOptional={false} />
        <TextAreaInput
          title="Can you give us more info about the situation"
          placeholder="Type your message here"
          isOptional={true}
        />
        <TextAreaInput title="Source of information" placeholder="Type your message here" isOptional={true} />
        <FileInput title="Upload pictures" isOptional={true} />
      </div>
    </Form>
  );
};

export default HelpOfferForm;
