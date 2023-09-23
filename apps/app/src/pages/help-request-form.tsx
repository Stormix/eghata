import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { useToast } from '@/components/atoms/use-toast';
import AddressInput from '@/components/molecules/address-input';
import AssistanceTypeInput from '@/components/molecules/assistance-type-input';
import FileInput from '@/components/molecules/file-input';
import MapInput from '@/components/molecules/map-input';
import Navbar from '@/components/molecules/navbar';
import RadioInput from '@/components/molecules/radio-input';
import TextAreaInput from '@/components/molecules/text-area-input';
import TextInput from '@/components/molecules/text-input';
import api from '@/lib/api';
import { EARTHQUAKE_EPICENTER } from '@/lib/config';
import { DetailTypes } from '@/lib/routes';
import { imageSchema } from '@/lib/validation';
import { RequestTypes } from '@/types/types';
import { FixType } from '@/types/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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

const HelpRequestForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: [],
      location: {
        address: undefined,
        ...EARTHQUAKE_EPICENTER
      },
      isOnSite: 'no',
      description: '',
      source: '',
      name: '',
      email: undefined,
      phone: '',
      files: []
    },
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const { isLoading, mutate: createHelpRequest } = useMutation({
    mutationFn: (formData: FormData) => api.createHelpRequest(formData),
    onSuccess: (data: FixType) => {
      toast({
        title: 'Help Request Created',
        description: 'Your help request has been created successfully',
        variant: 'success'
      });

      timeout.current = setTimeout(() => {
        return navigate('/detail/' + DetailTypes.Request + '/' + data.id);
      }, 1000);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive'
      });
    }
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append('types', JSON.stringify(values.types));
    formData.append('location', JSON.stringify(values.location));
    formData.append('isOnSite', values.isOnSite);
    if (values.description) formData.append('description', values.description);
    if (values.source) formData.append('source', values.source);
    formData.append('name', values.name);
    if (values.email) formData.append('email', values.email);
    formData.append('phone', values.phone);

    values.files.forEach((file) => {
      formData.append('files', file);
    });

    return createHelpRequest(formData);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 px-6 overflow-y-auto pb-28">
      <h1 className="text-2xl">{t('Request Help')}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="types"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AssistanceTypeInput label={t('What are your needs?')} {...field} />
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
                  <AddressInput label={t('Address')} placeholder={t('Full address')} {...field} />
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
                        label: 'Yes',
                        value: 'yes'
                      },
                      {
                        label: 'No',
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
                    label={t('Can you give us more info about the situation?')}
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
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextAreaInput
                    label={t('Source of information')}
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
                    label={t(`Your name or the on-site person's name`)}
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

          <Navbar asSubmit disabled={!isDirty || !isValid} loading={isSubmitting || isLoading} />
        </form>
      </Form>
    </div>
  );
};

export default HelpRequestForm;
