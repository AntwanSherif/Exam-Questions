import { Suspense } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"
import { Button, ButtonGroup, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { Link } from "app/core/components/Link"
import { Box } from "@chakra-ui/react"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [updateChoiceMutation] = useMutation(updateChoice)
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [question, { refetch }] = useQuery(getQuestion, { id: questionId })

  const handleDelete = async () => {
    if (window.confirm("This will be deleted")) {
      await deleteQuestionMutation({ id: question.id })
      router.push(Routes.QuestionsPage())
    }
  }

  const handleVote = async (id: number) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>{question.text}</title>
      </Head>

      <div>
        <Box my={5}>
          <Heading as="h1">{question.text}</Heading>
        </Box>

        <UnorderedList>
          {question.choices.map((choice) => (
            <ListItem key={choice.id}>
              {choice.text} - {choice.votes} votes
              <button onClick={() => handleVote(choice.id)}>Vote</button>
            </ListItem>
          ))}
        </UnorderedList>

        <Box mt={10}>
          <ButtonGroup variant="outline" spacing="2">
            <Button width="80px" colorScheme="blue">
              <Link href={Routes.EditQuestionPage({ questionId: question.id })}>Edit</Link>
            </Button>

            <Button colorScheme="red" width="80px" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </>
  )
}

const ShowQuestionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>Questions</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true
ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage
