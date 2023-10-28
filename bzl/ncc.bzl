def _ncc_impl(ctx):
  args = [ctx.attr.command] + ctx.attr.args
  print("NCC: ", ctx.executable.ncc.path)
  ncc = ctx.executable.ncc
  out = ctx.actions.declare_file(ctx.attr.out)
  in_file = ctx.files.src
  ctx.actions.run_shell(
    outputs = [out],
    inputs = in_file,
    tools = [ctx.executable.ncc],
    use_default_shell_env = True,
    command = """
echo "PWD = $PWD"
NCC_PATH={}
echo "NCC_PATH = $NCC_PATH"
ARGS={}
echo "---------------------------->"
ls -la $NCC_PATH/
echo "<----------------------------"
NCC="$( cd -P $(dirname $NCC_PATH) && pwd -P )/$(basename $NCC_PATH)"
echo "NCC = $NCC"
echo "---------------------------->"
ls -la $NCC
echo "<----------------------------"

$NCC version
    """.format(
      ctx.executable.ncc.path,
      " ".join(args)
    )
  )
  print("****Ending****")
  return [
    DefaultInfo(files = depset([out])),
  ]


ncc = rule(
  attrs = {
    "command": attr.string(
      doc = "ncc command to be executed."
    ),
    "src": attr.label(
      allow_single_file=True,
      doc = "Source file used to build this target."
    ),
    "ncc": attr.label(
      executable = True,
      cfg = "exec",
      allow_files = True,
      default = Label("@npm//:@vercel_ncc__contents"),
      doc = "ncc location."
    ),
    "out": attr.string(
      default = "dist",
      doc = "Output directory"
    ),
    "build_dir": attr.string(
      doc = "Build Output Directory"
    ),
    "args": attr.string_list(
      doc = "Build Arguments (additional)"
    ),
  },
  implementation = _ncc_impl
)
