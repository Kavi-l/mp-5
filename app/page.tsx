"use client"
import { TextField, Button, Link as MUILink} from "@mui/material"
// import { Textarea } from "@mui/joy"
import createUrlAlias from "./components/createUrlAlias"
import { useState } from "react"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';

export default function Home() {
  const style = "text-black"
  const [url, setUrl] = useState("")
  const [alias, setAlias] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [err, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
 
  return (
    <> 
      <h2 className="text-3xl font-bold pt-[5%] text-black text-center"> URL Shortener</h2>
      <form className="w-3xl min-h-[10vh] w-[50vw] flex flex-col m-auto mt-[2%] rounded-[12px] border-[2px] p-8"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("")
          setSuccess(false)
          try {
            const browserUrl = `${window.location.origin}`
            setLoading(true)
            const u = await createUrlAlias(url, alias, browserUrl)
            setLoading(false)
            setShortUrl(u)
            setSuccess(true)
            } catch (err) {
              setLoading(false)
              if (err instanceof Error) {
                setError(err.message)
              } else {
                setError("An unknown error occurred.")
              }
            }
          
      }} 
      >
        <h3 className={style}>URL</h3>
        <TextField
          sx= {{
            width: "100%",
            alignSelf: "center",
          }}
          type="text"
          label="Your URL here"
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        >
        </TextField>
      <h2 className={style}>Custom Alias</h2>
      <div className="flex flex-row items-center">
        {/* <p className="text-gray-400"></p> */}
        <TextField
          sx= {{}}
          type="text"
          label="alias"
          size="small"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        >
        </TextField>
      </div>
      <div className="flex justify-center pt-4">
          <Button
            loading={loading}
            sx={{
              width: "100%",
            }}
            variant="contained"
            type="submit"
            disabled={url==="" || alias===""}
          >
            Shorten
          </Button>
      </div>
      <div>
        
      </div>
      {err !== "" ? <p className="text-red-400 self-center font-bold mt-8"><ErrorIcon/>{err}</p> : null}
      {success === true ? (
        <div className="flex justify-between mt-4">
          <MUILink
            className="underline text-blue-600"
            href={`/${alias}`}
            target="_blank"
            underline="hover"
          >
            {shortUrl}
          </MUILink>

          <Button
            variant="outlined"
            endIcon={<ContentCopyIcon/>}
            onClick={
              () => navigator.clipboard.writeText(shortUrl)
            }
          >
            copy
          </Button>
          
        </div>) : null}

      </form>
    </>
  )
}