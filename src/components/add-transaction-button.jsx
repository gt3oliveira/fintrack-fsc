import {
  Loader2Icon,
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateTransactionForm } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const { form, onSubmit } = useCreateTransactionForm({
    onSuccess: () => {
      setDialogIsOpen(false)
      toast.success('Transação adicionada com sucesso.')
    },
    onError: () => {
      toast.error('Erro ao adicionar transação. Tente novamente.')
    },
  })

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome da transação"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      allowNegative={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      customInput={Input}
                      {...field}
                      onChange={() => {}}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue)
                      }}
                    />
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
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Invest
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:space-x-4">
              <DialogClose asChild>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Adicionar Transação
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionButton
