'use client'

import { useRouter } from 'next/navigation'
import { useGroupQuery } from '@/hooks/queries/use-group-query'
import { useDeleteGroup } from '@/hooks/mutations/use-group-mutations'
import { BadgeType } from '@/utils/badge-types'
import { AddMember } from '../add-member'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const getInitials = (name: string) => {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface IGroupDetailProps {
  groupId: string
}

export const GroupDetails = ({ groupId }: IGroupDetailProps) => {
  const router = useRouter()
  const { data: group } = useGroupQuery(groupId)
  const { mutateAsync: deleteGroup, isPending } = useDeleteGroup()

  if (!group) return null

  const handleDelete = async () => {
    await deleteGroup(groupId)
    router.push('/groups')
  }

  return (
    <div className="flex flex-col gap-6 px-8 w-full">
      <header className="flex flex-row items-center gap-3 h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-700 font-semibold">{group.name}</h1>
        <BadgeType type={group.category} />
      </header>

      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row flex-wrap items-center gap-2 border border-zinc-200 rounded-lg px-3 py-2 min-h-[52px]">
          {(group.members ?? []).map((member) => (
            <div
              key={member.id}
              title={member.name}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 font-poppins text-sm font-medium cursor-default select-none"
            >
              {getInitials(member.name)}
            </div>
          ))}
        </div>
        <AddMember groupId={groupId} currentMembers={group.members} />
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="w-40 text-red-400 border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Delete Group
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this group?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All group data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={isPending}
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
