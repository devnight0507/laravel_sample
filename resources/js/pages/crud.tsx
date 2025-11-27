import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from "@/components/ui/input"

import AppLayout from '@/layouts/app-layout';
import { crud } from '@/routes';
import { create } from "@/routes/crud";
import { CrudItem, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import AlertError from '@/components/alert-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crud Samples',
        href: crud().url,
    },
];

export default function Crud({ crudItems }: { crudItems: CrudItem[] }) {
    console.log('Crud Items:', crudItems);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const createNew = () => {
        console.log('Create new item:' , { name, description, quantity });
        console.log('POST to:', create().url);
        router.post(create().url, {
            name: name,
            description: description,
            quantity: quantity,
        }, {
            onSuccess: () => {
                setShowSuccess(true);
            },
            onError: () => {
                setShowError(true);
            },
        });
    }
    const setValues = (e: React.ChangeEvent<HTMLInputElement>, type='name') => {
        if(type === 'name') {
            setName(e.target.value);
        } else if(type === 'description') {
            setDescription(e.target.value);
        } else if(type === 'quantity') {
            setQuantity(Number(e.target.value));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crud Sample" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-fit">
                            Create New
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Create New Item
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <Input type="text" value={name} placeholder="Input Name" onChange={(e) => setValues(e, 'name')} />
                        <Input type="text" value={description} placeholder="Input Description" onChange={(e) => setValues(e, 'description')} />
                        <Input type="text" value={quantity} placeholder="Input Quantity" onChange={(e) => setValues(e, 'quantity')} />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button onClick={createNew}>Save</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Table>
                        <TableCaption>Crud Sample Table</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                                <TableHead>Created_at</TableHead>
                                <TableHead>Updated_at</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {crudItems?.length ? (
                                crudItems.map((crud) => (
                                    <TableRow key={crud.id}>
                                        <TableCell className="font-medium">{crud.id}</TableCell>
                                        <TableCell>{crud.name}</TableCell>
                                        <TableCell>{crud.description}</TableCell>
                                        <TableCell>{crud.quantity}</TableCell>
                                        <TableCell>{crud.created_at}</TableCell>
                                        <TableCell>{crud.updated_at}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button variant="link" className="p-0">Edit</Button>
                                            <Button variant="link" className="p-0 text-red-600">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center"
                                    >
                                        No data available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {showSuccess && (<AlertError errors={['Item created successfully!']} title="Success" />)}
            {showError && (<AlertError errors={['Failed to create item.']} title="Error" />)}
        </AppLayout>
    );
}
