<?php

namespace App\Models\Support;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Base\Uuid\UuidModel;


class SupportTicketMultiFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id','image_name','UuidModel'
    ];

    protected $guarded = [];

    /**
    * The accessors to append to the model's array form.
    *
    * @var array
    */
    protected $appends = [
        'image'
    ];
          /**
    * Get the Logo image full file path.
    *
    * @param string $value
    * @return string
    */
    public function getImageAttribute($value)
    {
        if (empty($value)) {
            return null;
        }

        return Storage::disk(env('FILESYSTEM_DRIVER'))->url(file_path($this->uploadPath(), $value));
    }
       /**
     * The default file upload path.
     *
     * @return string|null
     */
    public function uploadPath()
    {
        return config('base.supportticket.upload.images.path');
    }  
    public function ticket(){
        return $this->belongsTo(SupportTicket::class,'ticket_id','id');
    }
}
