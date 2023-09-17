import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import AddressInput from '@/components/molecules/address-input';
import AssistanceTypeInput from '@/components/molecules/assistance-type-input';
import FileInput from '@/components/molecules/file-input';
import MapInput from '@/components/molecules/map-input';
import Navbar from '@/components/molecules/navbar';
import RadioInput from '@/components/molecules/radio-input';
import TextAreaInput from '@/components/molecules/text-area-input';
import TextInput from '@/components/molecules/text-input';
import { EPICENTER } from '@/lib/config';
import { imageSchema } from '@/lib/validation';
import { RequestTypes } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as z from 'zod';

const formSchema = z.object({
  types: z.array(z.nativeEnum(RequestTypes)).nonempty(),
  location: z.object({
    address: z.string(),
    lat: z.number(),
    lng: z.number()
  }),
  isOnSite: z.enum(['yes', 'no'] as const),
  description: z.string().optional(),
  source: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  files: z.array(imageSchema).optional().default([])
});

const OfferHelpForm = () => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: [],
      location: {
        address: undefined,
        ...EPICENTER
      },
      isOnSite: 'no',
      description: '',
      name: '',
      email: undefined,
      phone: '',
      files: []
    },
    mode: 'onChange'
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col w-full gap-4 px-6 overflow-y-auto pb-20">
      <h1 className="text-2xl">Offer Help</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="types"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AssistanceTypeInput label={t('What can you provide?')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AddressInput
                    label={t('Address')}
                    placeholder={t('Full address')}
                    {...field}
                    helperText={t(
                      "Specify location where you can provide help, if you don't have means of transport, you can always post a transport request if you want to reach other locations"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MapInput label={t('Pin point the exact location on map if you can')} optional {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isOnSite"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioInput
                    label={t('Are you located on site?')}
                    options={[
                      {
                        label: t('Yes'),
                        value: 'yes'
                      },
                      {
                        label: t('No'),
                        value: 'no'
                      }
                    ]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextAreaInput
                    label={t('Can you give us more info about the help you can provide')}
                    placeholder={t('Type your message here')}
                    optional
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    label={t('Your name or the on-site person name')}
                    placeholder={t('Full Name')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput label={t('Email')} type="email" placeholder={t('Email')} optional {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput label={t('Phone Number')} placeholder={t('Phone Number')} type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileInput label={t('Upload pictures')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Navbar asSubmit disabled={!isDirty || !isValid} loading={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default OfferHelpForm;
