using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetFileViewer.DTOs;

namespace NetFileViewer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileViewerController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public FileViewerController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        //[HttpGet("Attachment")]
        //public async Task<ActionResult<List<FilesDTO>>> GetAttachment(string uniqueKey)
        //{

        //    var filesDTO = new List<FilesDTO>();

        //    if (uniqueKey == "J0001")
        //    {
        //        filesDTO.AddRange();
        //    }

        //    return filesDTO;

        //}


        [HttpGet("GetFile")]
        public async Task<IActionResult> GetFileAsync(string fileName)
        {
            var filePath = Path.Combine(configuration["StoragePath"], fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileContent = await System.IO.File.ReadAllBytesAsync(filePath);
            var contentType = GetContentType(filePath);

            if (contentType == "application/octet-stream")
            {
                return NotFound();
            }

            return File(fileContent, contentType, fileName);
        }

        [ApiExplorerSettings]
        private string GetContentType(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLowerInvariant();
            return extension switch
            {
                ".pdf" => "application/pdf",
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                // Add other file types as needed
                _ => "application/octet-stream",
            };
        }

    }
}
