(component $root
  (core module $MockMemory (;0;)
    (type $#type0 (;0;) (func (param i32 i32 i32 i32) (result i32)))
    (memory $memory (;0;) 1)
    (export "realloc" (func $realloc))
    (export "memory" (memory $memory))
    (func $realloc (;0;) (type $#type0) (param $#local0 i32) (param $#local1 i32) (param $#local2 i32) (param $#local3 i32) (result i32)
      i32.const 0
    )
    (data $#data0 (;0;) (i32.const 8) "Hello World!")
  )
  (core instance $memory (;0;) (instantiate $MockMemory))
  (type $#type0 (;0;)
    (instance
      (export $#type0 (;0;) "error" (type (sub resource)))
    )
  )
  (import "wasi:io/error@0.2.0" (instance $wasi:io/error@0.2.0 (;0;) (type $#type0)))
  (alias export $wasi:io/error@0.2.0 "error" (type $std::io::IoError (;1;)))
  (type $#type2 (;2;) (own $std::io::IoError))
  (type $std::io::StreamError (;3;) (variant (case "last-operation-failed" $#type2) (case "closed")))
  (type $#type4 (;4;)
    (instance
      (export $#type0 (;0;) "input-stream" (type (sub resource)))
      (export $#type1 (;1;) "output-stream" (type (sub resource)))
      (alias outer $root $std::io::StreamError (type $#type2 (;2;)))
      (export $#type3 (;3;) "stream-error" (type (eq $#type2)))
      (type $#type4 (;4;) (borrow $#type1))
      (type $#type5 (;5;) (list u8))
      (type $#type6 (;6;) (result (error $#type3)))
      (type $#type7 (;7;) (func (param "self" $#type4) (param "contents" $#type5) (result $#type6)))
      (export $#func0 (;0;) "[method]output-stream.blocking-write-and-flush" (func (type $#type7)))
    )
  )
  (import "wasi:io/streams@0.2.0" (instance $wasi:io/streams@0.2.0 (;1;) (type $#type4)))
  (alias export $wasi:io/streams@0.2.0 "input-stream" (type $std::io::InputStream (;5;)))
  (alias export $wasi:io/streams@0.2.0 "output-stream" (type $std::io::OutputStream (;6;)))
  (alias export $wasi:io/streams@0.2.0 "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write (;0;)))
  (type $#type7 (;7;)
    (instance
      (alias outer $root $std::io::OutputStream (type $#type0 (;0;)))
      (type $#type1 (;1;) (own $#type0))
      (type $#type2 (;2;) (func (result $#type1)))
      (export $#func0 (;0;) "get-stdout" (func (type $#type2)))
    )
  )
  (import "wasi:cli/stdout@0.2.0" (instance $wasi:cli/stdout@0.2.0 (;2;) (type $#type7)))
  (alias export $wasi:cli/stdout@0.2.0 "get-stdout" (func $std::io::standard_output (;1;)))
  (alias export $wasi:io/streams@0.2.0 "[method]output-stream.blocking-write-and-flush" (func $#func2 (;2;)))
  (alias core export $memory "memory" (core memory $#memory0 (;0;)))
  (alias core export $memory "realloc" (core func $#func0 (;0;)))
  (core func $std::io::OutputStream::write (;1;) (canon lower (func $#func2) (memory $#memory0) (realloc $#func0)))
  (alias export $wasi:cli/stdout@0.2.0 "get-stdout" (func $#func3 (;3;)))
  (core func $std::io::standard_output (;2;) (canon lower (func $#func3)))
  (core module $Main (;1;)
    (type $#type0 (;0;) (func (param i32 i32 i32 i32)))
    (type $#type1 (;1;) (func (result i32)))
    (type $#type2 (;2;) (func))
    (import "wasi:io/streams@0.2.0" "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write (;0;) (type $#type0)))
    (import "wasi:cli/stdout@0.2.0" "get-stdout" (func $std::io::standard_output (;1;) (type $#type1)))
    (export "main" (func $main))
    (start $main)
    (func $main (;2;) (type $#type2)
      call $std::io::standard_output
      i32.const 8
      i32.const 12
      i32.const 0
      call $std::io::OutputStream::write
    )
  )
  (core instance $#instance1 (;1;)
    (export "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write))
  )
  (core instance $#instance2 (;2;)
    (export "get-stdout" (func $std::io::standard_output))
  )
  (core instance $main (;3;) (instantiate $Main
      (with "wasi:io/streams@0.2.0" (instance $#instance1))
      (with "wasi:cli/stdout@0.2.0" (instance $#instance2))
    )
  )
)