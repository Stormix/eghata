import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { toast } from '@/components/atoms/use-toast';
import FileInput from '@/components/molecules/file-input';
import Navbar from '@/components/molecules/navbar';
import NumberInput from '@/components/molecules/numper-input';
import TextAreaInput from '@/components/molecules/text-area-input';
import TextInput from '@/components/molecules/text-input';
import TransportInput from '@/components/molecules/transport-input';
import api from '@/lib/api';
import { DetailTypes } from '@/lib/routes';
import { imageSchema } from '@/lib/validation';
import { FixType } from '@/types/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as z from 'zod';

const locationSchema = z.object({
  address: z.string(),
  lat: z.number(),
  lng: z.number()
});

const formSchema = z.object({
  transport: z.object({
    start: locationSchema,
    end: locationSchema
  }),
  date: z.string(),
  capacity: z.number().int().positive().optional(),
  description: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  files: z.array(imageSchema).optional().default([]),
  storage: z.string().optional()
});

const TransportRequestForm = () => {
  const { t } = useTranslation();
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transport: {
        start: {
          address: undefined,
          lat: 0,
          lng: 0
        },
        end: {
          address: undefined,
          lat: 0,
          lng: 0
        }
      },
      date: new Date().toString(),
      capacity: 1,
      description: '',
      name: '',
      email: undefined,
      phone: '',
      files: []
    },
    mode: 'onChange'
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const { isLoading, mutate: createCarpoolingRequest } = useMutation({
    mutationFn: (formData: FormData) => api.createCarpooling(formData),
    onSuccess: (data: FixType) => {
      toast({
        title: 'Transport Offer Created',
        description: 'Your offer has been successfully created.',
        variant: 'success'
      });
      timeout.current = setTimeout(() => {
        return navigate('/detail/' + DetailTypes.RideOffer + '/' + data.id);
      }, 1000);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive'
      });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //  'type','departure_longitude','departureLatitude','departureAddress','departureDate','arrivalLongitude','arrivalLatitude','arrivalAddress','arrivalDate','description','capacity','storageSpace','status',
    const formData = new FormData();
    formData.append('transport', JSON.stringify(values.transport));
    formData.append('date', values.date);
    formData.append('capacity', String(values.capacity));
    if (values.storage) formData.append('storageSpace', values.storage);
    if (values.description) formData.append('description', values.description);
    formData.append('name', values.name);
    if (values.email) formData.append('email', values.email);
    formData.append('phone', values.phone);
    values.files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('type', 'request');
    return createCarpoolingRequest(formData);
  };

  return (
    <div className="flex flex-col w-full gap-4 px-6 overflow-y-auto pb-20">
      <h1 className="text-2xl">{t('Request Transport')}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="transport"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TransportInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput label={t('Travel Date')} placeholder={t('Travel Date')} type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumberInput label={t('How many free seats?')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    label={t('How much storage space do you need?')}
                    placeholder={t('A 300L trunk for example')}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextAreaInput
                    label={t('Description')}
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
                  <TextInput label={t('Name')} placeholder={t('Full Name')} {...field} />
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
                  <FileInput label={t('Upload pictures')} {...field} optional />
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

export default TransportRequestForm;
